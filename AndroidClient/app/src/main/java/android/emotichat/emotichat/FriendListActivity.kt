package android.emotichat.emotichat

import android.content.Context
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.TextView

/**
 * Created by David on 1/14/2018.
 */

class FriendListActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_friend_list)
        var tokenText = findViewById<TextView>(R.id.token)

        var sharedPref = this.getSharedPreferences("EmotichatToken", Context.MODE_PRIVATE)
        var token = sharedPref.getString("token", "lol")
        tokenText.setText(token)
    }
}