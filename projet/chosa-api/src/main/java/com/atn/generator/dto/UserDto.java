package com.atn.generator.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;

import lombok.Data;
import java.util.Date;
import com.atn.commons.controller.dto.ModelDto;
import java.io.Serializable;
@Data
@XmlRootElement
public class UserDto extends ModelDto < Long > implements Serializable {

	@XmlElement
	private Long id;
	@XmlElement
	private String nom;
	@XmlElement
	private String prenom;
	@XmlElement
	private String email;
	@XmlElement
	private String status;
	@XmlElement
	private String userPassword;
	@XmlElement
	private Date birth_date;
	@XmlElement
	private Long user_picture_file;
	@XmlElement
	private String adress;
	@XmlElement
	private String ville;
	@XmlElement
	private String country;
	@XmlElement
	private String phone;
	@XmlElement
	private String google_Id;
	@XmlElement
	private String facebook_Id;
	@Override
	public Long getId() {
		return this.id;
	}
}