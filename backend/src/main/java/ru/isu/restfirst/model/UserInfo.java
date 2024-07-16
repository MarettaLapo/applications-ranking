package ru.isu.restfirst.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@Table(name = "user_info")
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "address")
    private String address;

    @Enumerated
    @Column(name = "disability")
    private Disability disability;

    @Enumerated
    @Column(name = "family_circumstances")
    private FamilyCircumstances familyCircumstances;

    @Column(name = "another_information")
    private String anotherInformation;

    @Column(name="is_located")
    private Boolean isLocated;

}
