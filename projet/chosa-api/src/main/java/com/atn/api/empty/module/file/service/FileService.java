package com.atn.api.empty.module.file.service;

import com.atn.api.empty.module.file.entity.File;
import com.atn.commons.service.MyService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

public interface FileService extends MyService<File,Long> {

    File uploadMultipartFile(MultipartFile file);

    void downloadDocument(OutputStream os, File file) throws IOException;

}
