package com.sinovdeath.client.services;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.widget.RemoteViews;

import com.sinovdeath.client.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Random;

public class WidgetService {
    public String getItemFromStorage(Context context) {
        String title = "";

        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"motivations\":'no data'}");
            JSONObject appData = new JSONObject(appString);

            RemoteViews remoteViews = new RemoteViews(context.getPackageName(),
                    R.layout.motivation_widget);

            JSONArray motivations = appData.getJSONArray("motivations");

            title = motivations.getJSONObject(getRandomItemFromArray(motivations)).get("title").toString();

        } catch (JSONException ex) {
            ex.printStackTrace();
        }

        return title;
    }

    private int getRandomItemFromArray(JSONArray array) {
        Random random = new Random();

        return random.nextInt(array.length());
    }
}
