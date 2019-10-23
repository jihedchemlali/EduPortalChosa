package com.atn.api.empty.module.file.entity;

import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.entities.ModelObject;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "APP_FILE", uniqueConstraints = @UniqueConstraint(columnNames = "FILE_ID"))
@Where(clause = "DELETING_DATE is NULL")
@Inheritance(strategy = InheritanceType.JOINED)
public class File extends ModelObject<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FILE_ID", unique = true, nullable = false)
    private Long id;


    @Column(name = "FILE_NAME")
    private String fileName;

    @Column(name = "PATH")
    private String filePath;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_ID_FK", nullable = false)
    @Where(clause = "DELETING_DATE is NULL")
    private User user ;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        File file = (File) o;
        return id.equals(file.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id);
    }
}

