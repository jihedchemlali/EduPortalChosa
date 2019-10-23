package com.atn.api.empty.module.file.persistence.jpa;

import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.file.persistence.FileDao;
import com.atn.commons.persistence.jpa.BaseDaoJpa;
import org.springframework.stereotype.Component;


@Component
public class FileDaoJpa extends BaseDaoJpa<File, Long> implements FileDao {

    public FileDaoJpa() {
        super(File.class);
    }
}
