package com.sinovdeath.client.services;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Random;

public class WidgetService {
    private static int previousRandomNumber = -1;

    public String getItemFromStorage(Context context) {
        String title = "";

        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"motivations\":'no data'}");
            JSONObject appData = new JSONObject(appString);

            JSONArray motivations = appData.getJSONArray("motivations");

            title = motivations.getJSONObject(getRandomNumberFromArray(motivations)).get("title").toString();

        } catch (JSONException ex) {
            ex.printStackTrace();
        }

        return title;
    }

    private int getRandomNumberFromArray(JSONArray array) {
        Random random = new Random();
        int newRandomNumber = random.nextInt(array.length());

        if (array.length() > 10) {
            while (previousRandomNumber == newRandomNumber) {
                newRandomNumber = random.nextInt(array.length());
            }
        }
        previousRandomNumber = newRandomNumber;

        return newRandomNumber;
    }
}
