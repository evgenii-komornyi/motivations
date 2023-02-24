package com.sinovdeath.motivations.services;

import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

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

        File[] list = getFilesCategoryFolder(categoriesDir);

        InputStream inputStream = getFileByCategoryAssetsFolder(motivationCategory, context);

        Bitmap bmp = null;

        if (list == null) {
            bmp = decodeStreamToBitmap(inputStream);
        } else {
            String fileName = getFileNameForBitmap(list, motivationCategory);

            Bitmap immutableBmp = BitmapFactory.decodeFile(categoriesDir + "/" + fileName);

            if (immutableBmp != null) {
                if (immutableBmp.getWidth() > 1920 && immutableBmp.getHeight() > 1080) {
                    bmp = convertBitmap(immutableBmp, 1920, 1080);
                } else if(immutableBmp.getWidth() > 700 && immutableBmp.getHeight() > 1500) {
                    bmp = convertBitmap(immutableBmp, 700, 1500);
                } else {
                    bmp = Bitmap.createScaledBitmap(immutableBmp, immutableBmp.getWidth(), immutableBmp.getHeight(), false);
                }
            } else {
                bmp = decodeStreamToBitmap(inputStream);
            }
        }

        return bmp;
    }

    private static Bitmap decodeStreamToBitmap(InputStream stream) {
        return BitmapFactory.decodeStream(stream);
    }

    private static String getFileNameForBitmap(File[] list, String motivationCategory) {
        String fileName = "";

        for (File file : list) {
            String[] fileAndExtension = file.getName().split("[.]", 0);

            if (file.getName().equals(motivationCategory + "." + fileAndExtension[1])) {
                fileName = file.getName();

                break;
            }
        }

        return fileName;
    }

    private static Bitmap convertBitmap(Bitmap immutableBmp, int width, int height) {
        Bitmap mutableBitmap = immutableBmp.copy(Bitmap.Config.ARGB_8888, true);

        return Bitmap.createScaledBitmap(mutableBitmap, width, height, false);
    }

    private static InputStream getFileByCategoryAssetsFolder(String motivationCategory, Context context) {
        InputStream inputStream = null;

        try {
            inputStream = context.getAssets().open("backgrounds/" + motivationCategory + ".jpg");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return inputStream;
    }

    private static File[] getFilesCategoryFolder(File categoriesDir) {
        File[] list = null;

        if (categoriesDir.exists()) {
            list = categoriesDir.listFiles();
        }

        return list;
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
