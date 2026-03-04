package com.ptzivaras.userhub.repository;

import com.ptzivaras.userhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // custom queries can be defined here 
}
