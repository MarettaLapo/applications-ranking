package ru.isu.restfirst.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ru.isu.restfirst.exception.MinimumDate;

import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Setter
@Getter
@ToString
public class ApplicationRequest {
    private Long userId;
    @MinimumDate
    private LocalDate birthDate;
    @Pattern(regexp  = "[а-яА-Я]+", message = "country.Поле должно содержать только буквы русского алфавита")
    private String country;
    @Pattern(regexp  = "[а-яА-Я]+", message = "city.Поле должно содержать только буквы русского алфавита")
    private String city;
    @Pattern(regexp  = "[а-яА-Я.,\\s0-9]+", message = "address.Поле должно содержать только " +
            "буквы русского алфавита, арабские числа, знаки: точка, запятая, пробел")
    private String address;
    private String disability;
    private String familyCircumstance;
    @Pattern(regexp  = "[а-яА-Я.,\\s0-9]*|null", message = "anotherInformation.Поле должно содержать только " +
            "буквы русского алфавита, арабские числа, знаки: точка, запятая, пробел")
    private String anotherInformation;
}
