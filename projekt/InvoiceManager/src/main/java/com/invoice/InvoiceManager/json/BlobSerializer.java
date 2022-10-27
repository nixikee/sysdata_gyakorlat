package com.invoice.InvoiceManager.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;

public class BlobSerializer extends StdSerializer<Blob> {

    public BlobSerializer() {
        this(null);
    }

    protected BlobSerializer(Class<Blob> t) {
        super(t);
    }

    @Override
    public void serialize(Blob value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        try {
            gen.writeString(Base64.getEncoder().encodeToString(value.getBytes(1L, (int) value.length())));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
