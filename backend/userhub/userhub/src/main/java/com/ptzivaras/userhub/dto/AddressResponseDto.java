package com.ptzivaras.userhub.dto;

import com.ptzivaras.userhub.entity.AddressType;

import java.time.LocalDateTime;

public class AddressResponseDto {
    private Long id;
    private AddressType addressType;
    private String addressText;
    private LocalDateTime createdAt;

    public AddressResponseDto() {}

    public AddressResponseDto(Long id, AddressType addressType, String addressText, LocalDateTime createdAt) {
        this.id = id;
        this.addressType = addressType;
        this.addressText = addressText;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public AddressType getAddressType() { return addressType; }
    public void setAddressType(AddressType addressType) { this.addressType = addressType; }

    public String getAddressText() { return addressText; }
    public void setAddressText(String addressText) { this.addressText = addressText; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
