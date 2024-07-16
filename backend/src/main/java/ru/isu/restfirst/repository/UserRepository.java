package ru.isu.restfirst.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.isu.restfirst.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User searchById(Long id);

    User findByUsername(String username);

    boolean existsByUsername(String username);
}
