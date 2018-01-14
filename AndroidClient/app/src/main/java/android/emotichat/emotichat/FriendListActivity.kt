package android.emotichat.emotichat

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.TextView
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.kittinunf.fuel.core.FuelError
import com.github.kittinunf.fuel.httpPost
import com.github.kittinunf.result.Result
import com.github.kittinunf.result.getAs
import com.google.gson.*
import kotlinx.android.synthetic.main.activity_friend_list.*

/**
 * Created by David on 1/14/2018.
 */

class FriendListActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_friend_list)

        var sharedPref = this.getSharedPreferences("EmotichatToken", Context.MODE_PRIVATE)
        var token = sharedPref.getString("token", "error no token")
        var friendsListEndpoint = "https://davidvan.lib.id/Emotichat@dev/get_friends_list/"

        var data: String? = null
        var error: FuelError? = null
        var bundle = intent.extras
        var userName = bundle?.getString("userName")

        friendsListEndpoint.httpPost().body("""
                {
                    "userName": "$userName"
                }
            """.trimIndent()).header(mapOf("Content-Type" to "application/json")).responseString { request, response, result ->
            when (result) {
                is Result.Failure -> {
                    error = result.getAs()
                    Log.d("David", error.toString())
                }
                is Result.Success -> {
                    data = result.getAs<String>(); // Friends list
                    var jelement = JsonParser().parse(data)
                    var friendsJson = jelement.asJsonArray
                    var friends = ArrayList<String>()
                    for (friend: JsonElement in friendsJson) {
                        friends.add(friend.asString)
                    }
                    var adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, friends)
                    var listView = findViewById<ListView>(R.id.friendsList)
                    listView.adapter = adapter

                    listView.setOnItemClickListener {
                        parent, view, position, id ->

                        var intent = Intent(this, ChatActivity ::class.java)
                        var bundle = Bundle()
                        bundle.putString("userName", userName)
                        bundle.putString("recipient", friends.get(position))
                        intent.putExtras(bundle)
                        startActivity(intent)
                    }
                }
            }
        }


    }
}