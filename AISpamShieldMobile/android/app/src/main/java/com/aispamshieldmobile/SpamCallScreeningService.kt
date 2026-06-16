package com.aispamshieldmobile

import android.net.Uri
import android.telecom.Call
import android.telecom.CallScreeningService
import android.util.Log

class SpamCallScreeningService : CallScreeningService() {

    override fun onScreenCall(callDetails: Call.Details) {
        val phoneNumber: String = getPhoneNumber(callDetails.handle) ?: ""
        Log.d("SpamShield", "Incoming call from: $phoneNumber")

        // In a real app, you would query your React Native database or a SharedPreferences list.
        // For demonstration, we'll auto-allow, but you can build the bridge to reject.
        val response = CallResponse.Builder()
            .setDisallowCall(false) // Set to true to hang up
            .setRejectCall(false)
            .setSkipCallLog(false)
            .setSkipNotification(false)
            .build()
        
        respondToCall(callDetails, response)
    }

    private fun getPhoneNumber(handle: Uri?): String? {
        return handle?.schemeSpecificPart
    }
}
