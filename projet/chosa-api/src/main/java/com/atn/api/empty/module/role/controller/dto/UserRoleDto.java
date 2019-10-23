package com.atn.api.empty.module.role.controller.dto;



import com.atn.commons.controller.dto.ModelDto;

import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;

public class UserRoleDto extends ModelDto<Long> implements Serializable {

    private static final long serialVersionUID = -5387261625033043992L;



    @XmlElement
    private Long id;

    @XmlElement
    private String role;

    @XmlElement
    private Long user_id;


    public UserRoleDto() {
    }

    public UserRoleDto(Long id, String role, Long user_id) {
        this.id = id;
        this.role = role;
        this.user_id = user_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
