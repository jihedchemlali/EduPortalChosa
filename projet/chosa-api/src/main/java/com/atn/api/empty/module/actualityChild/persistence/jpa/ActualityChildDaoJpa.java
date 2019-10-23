package com.atn.api.empty.module.actualityChild.persistence.jpa;


import com.atn.api.empty.module.actualityChild.entity.ActualityChild;
import com.atn.api.empty.module.actualityChild.persistence.ActualityChildDao;
import com.atn.commons.persistence.jpa.BaseDaoJpa;
import org.springframework.stereotype.Component;

@Component
public class ActualityChildDaoJpa extends BaseDaoJpa<ActualityChild , Long>  implements ActualityChildDao {

    public ActualityChildDaoJpa(){
        super(ActualityChild.class);
    }

}
