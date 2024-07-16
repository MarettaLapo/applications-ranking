package ru.isu.restfirst.exception;

import javax.validation.Constraint;
import javax.validation.constraints.Past;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Payload;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MinimumDateValidator.class)
public @interface MinimumDate {
    String message() default "birthDate.Вам должно быть больше 16 лет";
    public Class<?>[] groups() default {};
    public Class<? extends Payload> [] payload() default {};

    String value() default "2007-01-01";
}