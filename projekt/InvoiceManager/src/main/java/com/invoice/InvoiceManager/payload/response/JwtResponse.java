package com.invoice.InvoiceManager.payload.response;

import java.util.List;

public class JwtResponse {

	private int userId;

	private String companyId;

	private String email;

	private String firstName;

	private String lastName;

	private String role;

	public JwtResponse(int userId, String companyId, String email, String firstName, String lastName, String role) {
		this.userId = userId;
		this.companyId = companyId;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getRole() {
		return role;
	}
}
