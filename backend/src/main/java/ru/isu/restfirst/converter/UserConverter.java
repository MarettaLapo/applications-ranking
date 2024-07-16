package ru.isu.restfirst.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import ru.isu.restfirst.model.User;
import ru.isu.restfirst.service.ApplicationService;

public class UserConverter implements Converter<Long, User> {

    @Autowired
    private ApplicationService applicationService;

    @Override
    public User convert(Long id) {
        User user = applicationService.getUser(id);
        return user;
    }
}
