package com.sinovdeath.client.services;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Random;

public class WidgetService {
    private static int previousRandomNumber = -1;

    public static Motivation getItemFromStorage(Context context) {
        Motivation motivation = new Motivation("", "");

        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"motivations\":'no data'}");
            JSONObject appData = new JSONObject(appString);

            JSONArray motivations = appData.getJSONArray("motivations");
            JSONObject randomMotivation = motivations.getJSONObject(getRandomNumberFromArray(motivations));

            motivation = new Motivation(randomMotivation.get("title").toString(), randomMotivation.get("category").toString());
        } catch (JSONException ex) {
            ex.printStackTrace();
        }

        return motivation;
    }

    public static Bitmap getImageByCategory(String motivationCategory, Context context) {
        File dir = context.getFilesDir();
        File categoriesDir = new File(dir + "/categories");

        File[] list = null;

        if (categoriesDir.exists()) {
            list = categoriesDir.listFiles();
        }

        InputStream is = null;
        try {
            is = context.getAssets().open("backgrounds/" + motivationCategory + ".jpg");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Bitmap bmp = null;

        if (list == null) {
            bmp = BitmapFactory.decodeStream(is);
        } else {
            String fileName = "";

            for (File file : list) {
                String[] splitted = file.getName().split("[.]", 0);
                if (file.getName().equals(motivationCategory + "." + splitted[1])) {
                    fileName = file.getName();

                    break;
                }
            }

            bmp = BitmapFactory.decodeFile(categoriesDir + "/" + fileName);
        }

        return bmp;
    }

    private static int getRandomNumberFromArray(JSONArray array) {
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
