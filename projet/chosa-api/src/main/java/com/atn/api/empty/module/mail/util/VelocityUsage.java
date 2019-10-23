package com.atn.api.empty.module.mail.util;

import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;

public class VelocityUsage {

    public static String generateTemplate(String filePath, Map<String,String> map) throws IOException {
        Velocity.init();

        VelocityContext context = new VelocityContext();

        for (Map.Entry<String, String> entry : map.entrySet()) {
            context.put(entry.getKey(), entry.getValue());
        }

        FileInputStream file = new FileInputStream(filePath);

        StringWriter swOut = new StringWriter();
        Velocity.evaluate(context, swOut, "test", file);

        return swOut.getBuffer().toString();
    }

}
