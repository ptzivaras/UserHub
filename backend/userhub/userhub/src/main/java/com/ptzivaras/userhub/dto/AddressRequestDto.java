package com.ptzivaras.userhub.dto;

import com.ptzivaras.userhub.entity.AddressType;
import jakarta.validation.constraints.NotNull;

public class AddressRequestDto {
    @NotNull(message = "Address type is mandatory")
    private AddressType addressType;

    private String addressText;

    public AddressRequestDto() {}

    public AddressRequestDto(AddressType addressType, String addressText) {
        this.addressType = addressType;
        this.addressText = addressText;
    }

    public AddressType getAddressType() { return addressType; }
    public void setAddressType(AddressType addressType) { this.addressType = addressType; }

    public String getAddressText() { return addressText; }
    public void setAddressText(String addressText) { this.addressText = addressText; }
}
