package com.ptzivaras.userhub.repository;

import com.ptzivaras.userhub.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    // custom queries can be defined here
}
