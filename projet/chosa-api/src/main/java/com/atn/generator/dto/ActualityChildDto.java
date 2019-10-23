package com.atn.generator.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;

import lombok.Data;
import java.util.Date;
import com.atn.commons.controller.dto.ModelDto;
import java.io.Serializable;
@Data
@XmlRootElement
public class ActualityChildDto extends ModelDto < Long > implements Serializable {

	@XmlElement
	private Long id;
	@XmlElement
	private Long file;
	@XmlElement
	private Long user;
	@XmlElement
	private String commentaire;
	@XmlElement
	private Date creationDate;
	@XmlElement
	private String type;
	@XmlElement
	private Long child;
	@XmlElement
	private String longitude;
	@XmlElement
	private String latitude;
	@Override
	public Long getId() {
		return this.id;
	}
}