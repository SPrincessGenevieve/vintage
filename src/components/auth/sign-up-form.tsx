"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ArrowRight from "@/icons/ph_arrow-up.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import Loading from "../loading";

import "react-country-state-city/dist/react-country-state-city.css";
import SearchSelect from "../search-select";
import SpinnerIcon from "@/images/Spinner";
import CountriesSelect from "../settings/country-select";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export default function SignupForm() {
  const {
    setUserDetails,
    email,
    oldemail,
    password1,
    password2,
    phone_number,
    first_name,
    last_name,
    birth_date,
    state,
    country,
    city,
    street_address,
    postal_code,
  } = useUserContext();

  const [emailLocal, setEmail] = useState(email);
  const [oldEmailLocal, setOldEmail] = useState(oldemail);
  const [password1Local, setPassword1] = useState(password1);
  const [password2Local, setPassword2] = useState(password2);
  const [phoneNumberLocal, setPhoneNumber] = useState(phone_number);
  const [first_nameLocal, setFirstName] = useState(first_name);
  const [birth_date_local, setBirthDate] = useState(birth_date);
  const [state_local, setState] = useState(state);
  const [country_local, setCountry] = useState(country);
  const [city_local, setCity] = useState(city);
  const [street_address_local, setStreetAddress] = useState(street_address);
  const [postal_local, setPostalCode] = useState(postal_code);
  const [last_nameLocal, setLastName] = useState(last_name);
  const [loading, setLoading] = useState(false); // Loading state added
  const [open, setOpen] = useState(false);
  const navigate = useRouter();
  const [warning, setWarning] = useState(false);

  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);
  const [isLastNameEmpty, setIsLastNameEmpty] = useState(false);
  const [isBirthDateEmpty, setIsBirthDateEmpty] = useState(false);
  const [isCountryEmpty, setIsCountryEmpty] = useState(false);
  const [isStateEmpty, setIsStateEmpty] = useState(false);
  const [isCityEmpty, setIsCityEmpty] = useState(false);
  const [isStreetAddressEmpty, setIsStreetAddressEmpty] = useState(false);
  const [isPostalCodeEmpty, setIsPostalCodeEmpty] = useState(false);
  const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPassword1Empty, setIsPassword1Empty] = useState(false);
  const [isPassword2Empty, setIsPassword2Empty] = useState(false);
  // Sync local state with context values whenever they change
  useEffect(() => {
    setEmail(email);
    setOldEmail(oldEmailLocal);
    setPassword1(password1);
    setPassword2(password2);
    setPhoneNumber(phone_number);
    setFirstName(first_name);
    setLastName(last_name);
    setBirthDate(birth_date);
    setState(state);
    setCountry(country);
    setCity(city);
    setStreetAddress(street_address);
    setPostalCode(postal_code);
  }, [
    email,
    oldemail,
    password1,
    password2,
    phone_number,
    first_name,
    last_name,
    birth_date,
    state,
    city,
    street_address,
    postal_code,
  ]);

  const handleEmailChange = (newEmail: string) => {
    setOldEmail(emailLocal); // Store the current email as old email before updating
    setEmail(newEmail); // Update with the new email
  };

  // Function to check if the password is strong enough
  const isPasswordStrong = (password: string) => {
    const minLength = 8;
    const idealLength = 14;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length < minLength) {
      alert("Password must be at least 8 characters long");
      return false;
    } else if (password.length >= minLength && password.length < idealLength) {
      return true;
    } else if (!passwordRegex.test(password)) {
      alert(
        "Password must contain a mix of uppercase, lowercase, numbers, and special characters, such as: ! @ # $ % ^ & * ( ) - _ = +  | [ ] { } ; : / ? . >"
      );
      return false;
    }

    return true;
  };

  // Handle the Next button click
  const handleNext = (e?: React.MouseEvent | React.KeyboardEvent) => {
    setLoading(true);

    // Check if any required field is empty
    if (
      !emailLocal ||
      !password1Local ||
      !password2Local ||
      !phoneNumberLocal ||
      !first_nameLocal ||
      !last_nameLocal ||
      !birth_date_local ||
      !state_local ||
      !country_local ||
      !city_local ||
      !street_address_local ||
      !postal_local
    ) {
      if (e) e.preventDefault(); // Prevent the Link navigation
      setWarning(true);
      setIsFirstNameEmpty(!first_nameLocal);
      setIsLastNameEmpty(!last_nameLocal);
      setIsBirthDateEmpty(!birth_date_local);
      setIsCountryEmpty(!country_local);
      setIsStateEmpty(!state_local);
      setIsCityEmpty(!city_local);
      setIsStreetAddressEmpty(!street_address_local);
      setIsPostalCodeEmpty(!postal_local);
      setIsPhoneNumberEmpty(!phoneNumberLocal);
      setIsEmailEmpty(!emailLocal);
      setIsPassword1Empty(!password1Local);
      setIsPassword2Empty(!password2Local);

      setLoading(false);
      // setWarning(true);
      // setTimeout(() => {
      //   setWarning(false);
      // }, 3000);
      return; // Stop further execution if any field is empty
    }

    setIsFirstNameEmpty(false);
    setIsLastNameEmpty(false);
    setIsBirthDateEmpty(false);
    setIsCountryEmpty(false);
    setIsStateEmpty(false);
    setIsCityEmpty(false);
    setIsStreetAddressEmpty(false);
    setIsPostalCodeEmpty(false);
    setIsPhoneNumberEmpty(false);
    setIsEmailEmpty(false);
    setIsPassword1Empty(false);
    setIsPassword2Empty(false);

    // Calculate age based on the birth date
    const birthDate = new Date(birth_date_local);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // Check if the user is underage
    if (age < 18) {
      if (e) e.preventDefault(); // Prevent the Link navigation
      setLoading(false);
      setOpen(true);
      return; // Stop further execution if user is underage
    }

    // Validate if the password is strong enough
    if (!isPasswordStrong(password1Local)) {
      if (e) e.preventDefault(); // Prevent the Link navigation
      setLoading(false);
      return; // Stop further execution if password is not strong enough
    }

    // Check if password1 and password2 match
    if (password1Local !== password2Local) {
      alert("Password does not match");
      if (e) e.preventDefault(); // Prevent the Link navigation
      setLoading(false);
      return; // Stop further execution if passwords don't match
    }

    // If all fields are filled and passwords match, set user details
    setUserDetails({
      email: emailLocal,
      oldemail: oldEmailLocal,
      password1: password1Local,
      password2: password2Local,
      phone_number: phoneNumberLocal,
      first_name: first_nameLocal,
      last_name: last_nameLocal,
      birth_date: birth_date_local,
      state: state_local,
      country: country_local,
      city: city_local,
      street_address: street_address_local,
      postal_code: postal_local,
    });

    navigate.push("/auth/sign-up-2");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleNext(); // Simulate button click on Enter key press
    }
  };

  console.log("\n\n");
  console.log("Email:", email);
  console.log("Old Email:", oldemail);
  console.log("Password 1:", password1);
  console.log("Password 2:", password2);
  console.log("Phone Number:", phone_number);
  console.log("First Name:", first_name);
  console.log("Last Name:", last_name);
  console.log("Birth Date:", birth_date);
  console.log("State:", state);
  console.log("City:", city);
  console.log("Street Address:", street_address);
  console.log("Postal Code:", postal_code);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Registration Denied</DialogTitle>
          <p>You must be at least 18 years old to register.</p>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-5 flex-grow h-full overflow-y-auto">
        {warning && <p className="text-[red]">Please fill in all fields.</p>}

        <div className="flex flex-col gap-2">
          <div className="flex h-auto items-center justify-center gap-x-5">
            <div className="flex w-full flex-col">
              <Label className="mb-2">First Name</Label>
              <Input
                onKeyDown={handleKeyDown}
                id="first_name"
                name="first_name"
                type="text"
                placeholder="John"
                required
                value={first_nameLocal}
                onChange={(e) => setFirstName(e.target.value)}
                className={`h-full min-h-[40px] ${
                  isFirstNameEmpty ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label className="mb-2">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Doe"
                onKeyDown={handleKeyDown}
                required
                value={last_nameLocal}
                onChange={(e) => setLastName(e.target.value)}
                className={`h-full min-h-[40px] ${
                  isLastNameEmpty ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>

          <div className="flex h-auto items-center justify-center gap-x-5 ">
            <div className="flex w-full flex-col">
              <Label className="mb-2">Birth Date</Label>
              <Input
                id="first_name"
                name="first_name"
                type="date"
                placeholder="John"
                onKeyDown={handleKeyDown}
                required
                value={birth_date_local}
                onChange={(e) => setBirthDate(e.target.value)}
                className={`h-full min-h-[40px] ${
                  isBirthDateEmpty ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex h-auto items-center justify-center gap-x-5 ">
            <div className="flex w-full flex-col">
              <Label className="mb-2">Country</Label>
              <CountriesSelect
                value={country_local}
                setValue={(e) => setCountry(e)}
                className={`h-full min-h-[40px] ${
                  isCountryEmpty ? "border-red-500" : ""
                }`}
              ></CountriesSelect>
            </div>
          </div>
          <div className="flex h-auto items-center justify-center gap-x-5 ">
            <div className="flex w-full flex-col">
              <Label className="mb-2">State</Label>
              <Input
                id="state"
                name="state"
                type="text"
                placeholder=""
                onKeyDown={handleKeyDown}
                required
                value={state_local}
                onChange={(e) => setState(e.target.value)} // Call handleEmailChange
                className={`h-full min-h-[40px] ${
                  isStateEmpty ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label className="mb-2">City</Label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder=""
                onKeyDown={handleKeyDown}
                required
                value={city_local}
                onChange={(e) => setCity(e.target.value)} // Call handleEmailChange
                className={`h-full min-h-[40px] ${
                  isCityEmpty ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex h-auto gap-x-5">
            <div className="flex w-full flex-col">
              <Label className="mb-2">Street Address</Label>
              <Input
                id="street"
                name="street"
                type="text"
                placeholder=""
                onKeyDown={handleKeyDown}
                required
                value={street_address_local}
                onChange={(e) => setStreetAddress(e.target.value)}
                className={`h-full min-h-[40px] ${
                  isStreetAddressEmpty ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label className="mb-2">Postal Code</Label>
              <Input
                id="postal"
                name="postal"
                type="text"
                placeholder=""
                onKeyDown={handleKeyDown}
                required
                value={postal_local}
                onChange={(e) => setPostalCode(e.target.value)}
                className={`h-full min-h-[40px] ${
                  isPostalCodeEmpty ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>

          <div className="flex h-auto gap-x-5">
            <div className="flex w-full flex-col">
              <Label className="mb-2">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@gmail.com"
                onKeyDown={handleKeyDown}
                required
                value={emailLocal}
                onChange={(e) => handleEmailChange(e.target.value)} // Call handleEmailChange
                className={`h-full min-h-[40px] ${
                  isEmailEmpty ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label className="mb-2">Phone #</Label>
              <Input
                id="phone_number"
                name="phone_number"
                type="text"
                placeholder="+1 100001 10110"
                onKeyDown={handleKeyDown}
                required
                value={phoneNumberLocal}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`h-full min-h-[40px] ${
                  isPhoneNumberEmpty ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>
          <div className="pass-group gap-5 flex flex-col w-full">
            <div className="flex h-auto gap-x-5 w-full">
              <div className="flex w-full flex-col">
                <Label className="mb-2">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*******************"
                  onKeyDown={handleKeyDown}
                  required
                  value={password1Local}
                  onChange={(e) => setPassword1(e.target.value)}
                  className={`h-full min-h-[40px] ${
                    isPassword1Empty ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="flex w-full flex-col">
                <Label className="mb-2">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="*******************"
                  onKeyDown={handleKeyDown}
                  required
                  value={password2Local}
                  onChange={(e) => setPassword2(e.target.value)}
                  className={`h-full min-h-[40px] ${
                    isPassword2Empty ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Link
              href="/auth/sign-up-2"
              className="flex bg-[#104144] text-white rounded-3xl p-2 w-[170px] items-center justify-center"
              onClick={handleNext} // Call the function on button click
            >
              {loading && (
                <div>
                  <SpinnerIcon strokeColor="white"></SpinnerIcon>
                </div>
              )}
              Next <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
