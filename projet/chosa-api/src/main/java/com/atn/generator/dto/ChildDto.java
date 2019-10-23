package com.atn.generator.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;

import lombok.Data;
import java.util.Date;
import com.atn.commons.controller.dto.ModelDto;
import java.io.Serializable;
@Data
@XmlRootElement
public class ChildDto extends ModelDto < Long > implements Serializable {

	@XmlElement
	private Long id;
	@XmlElement
	private String prenom;
	@XmlElement
	private String code;
	@XmlElement
	private Long picture;
	@XmlElement
	private Date birth_date;
	@XmlElement
	private String sexe;
	@XmlElement
	private String status;
	@XmlElement
	private Long parent;
	@XmlElement
	private Long trainingCenter;
	@Override
	public Long getId() {
		return this.id;
	}
}