package com.atn.api.empty.module.child.service;

import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.file.entity.File;
import com.atn.commons.persistence.BaseDao;
import com.atn.commons.service.MyService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ChildService extends MyService<Child, Long> {

}
