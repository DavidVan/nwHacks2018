package android.emotichat.emotichat

import android.os.Bundle
import android.support.design.widget.Snackbar
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.LinearLayoutManager
import android.widget.LinearLayout
import android.widget.ListView
import com.github.kittinunf.fuel.core.FuelError

import kotlinx.android.synthetic.main.activity_chat.*

class ChatActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat)

        var data: String? = null
        var error: FuelError? = null
        var bundle = intent.extras
        var userName = bundle?.getString("userName")
        var recipient = bundle?.getString("recipient")

        val recyclerView = findViewById<ListView>(R.id.reyclerview_message_list) as RecyclerView

        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)

        val messages = ArrayList<Message>()

        messages.add(Message("1", "2", "You", "Me", "Hello!"))
        messages.add(Message("1", "2", "You", "Me", "How are you?"))
        messages.add(Message("1", "2", "You", "Me", "Well Met!"))
        messages.add(Message("1", "2", "You", "Me", "Goodbye!"))

        val adapter = MessageAdapter(messages)

        recyclerView.adapter = adapter
    }
}
