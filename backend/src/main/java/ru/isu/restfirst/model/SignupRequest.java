package ru.isu.restfirst.model;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SignupRequest {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String patronymic;

}

