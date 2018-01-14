package android.emotichat.emotichat

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.ListView

/**
 * Created by harold on 1/14/18.
 */

class MessageAdapter(val messageList : ArrayList<Message>) : RecyclerView.Adapter<MessageAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MessageAdapter.ViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.activity_chat, parent, false)
        return ViewHolder(v)
    }

    override fun getItemCount(): Int {
        return messageList.size
    }

    override fun onBindViewHolder(holder: MessageAdapter.ViewHolder, position: Int) {
        holder.bindItems(messageList[position])
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bindItems(message: Message) {
            val textViewName = itemView.findViewById<TextView>(R.id.text_message_name) as TextView
            val textViewContent = itemView.findViewById<TextView>(R.id.text_message_body) as TextView

            textViewName.text = message.from
            textViewContent.text = message.content
        }

    }
}

