package android.emotichat.emotichat

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.widget.Button
import android.widget.EditText
import com.github.kittinunf.fuel.core.FuelError
import com.github.kittinunf.fuel.httpPost
import com.github.kittinunf.result.Result
import com.github.kittinunf.result.getAs

/**
 * Created by David on 1/13/2018.
 */

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        var loginBtn = findViewById<Button>(R.id.loginBtn)
        loginBtn.setOnClickListener {
            var userName = findViewById<EditText>(R.id.userName).text.toString()
            var password = findViewById<EditText>(R.id.password).text.toString()
            var loginEndpoint = "https://davidvan.lib.id/Emotichat@dev/authenticate_account/"

            var data: String? = null
            var error: FuelError? = null

            loginEndpoint.httpPost().body("""
                {
                    "userName": "$userName",
                    "password": "$password"
                }
            """.trimIndent()).header(mapOf("Content-Type" to "application/json")).responseString { request, response, result ->
                when (result) {
                    is Result.Failure -> {
                        error = result.getAs()
                    }
                    is Result.Success -> {
                        data = result.getAs<String>(); // Token
                        val sharedPref = this.getSharedPreferences("EmotichatToken", Context.MODE_PRIVATE)
                        with(sharedPref.edit()){
                            putString("token", data)
                            commit()
                        }
                        // Launch main part of application
                        var intent = Intent(this, FriendListActivity::class.java)
                        var bundle = Bundle()
                        bundle.putString("userName", userName)
                        bundle.putString("token", data)
                        intent.putExtras(bundle)
                        startActivity(intent)
                    }
                }
            }
        }
    }

}