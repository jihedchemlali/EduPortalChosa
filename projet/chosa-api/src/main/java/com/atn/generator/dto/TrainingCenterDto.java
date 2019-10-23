package com.atn.generator.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;

import lombok.Data;
import java.util.Date;
import com.atn.commons.controller.dto.ModelDto;
import java.io.Serializable;
@Data
@XmlRootElement
public class TrainingCenterDto extends ModelDto < Long > implements Serializable {

	@XmlElement
	private Long id;
	@XmlElement
	private String name;
	@XmlElement
	private Long logo;
	@XmlElement
	private Date foundationDay;
	@XmlElement
	private String status;
	@XmlElement
	private String address;
	@XmlElement
	private String ville;
	@XmlElement
	private String country;
	@XmlElement
	private String phone;
	@XmlElement
	private Long manager;
	@Override
	public Long getId() {
		return this.id;
	}
}