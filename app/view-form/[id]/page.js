"use client";
//import the Form component from the @/app folder
import Form from "@/app/Form";
//import the ArrowBack icon from the @mui/icons-material folder
import { ArrowBack } from "@mui/icons-material";
//import the Container, Grid, and IconButton components from the @mui/material folder
import { Button, Container, Grid, IconButton } from "@mui/material";
import Link from "next/link";
//import the useParams and useRouter functions from the next/navigation folder
import { useParams, useRouter } from "next/navigation";
//import the React, useEffect, and useState functions from the react folder
import React, { useEffect, useState } from "react";

//export the ViewForm function
export default function ViewForm() {
  //get the router and form_param from the useRouter and useParams functions respectively
  const router = useRouter();
  const form_param = useParams();
  //set the formFields to an empty array
  const [formFields, setFormFields] = useState([]);
  const [allForms, setAllForms] = useState([]);

  //run the following code when the component is mounted
  useEffect(() => {
    //get the all_forms from localStorage or an empty array
    let all_forms = JSON.parse(localStorage.getItem("all_forms")) || [];
    setAllForms(all_forms);
    //get the form_param["id"] - 1
    let this_form_id = form_param["id"] - 1;
    //if all_forms and all_forms.length > 0, set the formFields to all_forms[this_form_id]
    if (all_forms && all_forms.length > 0) {
      setFormFields(all_forms[this_form_id]);
    }
  }, []);

  if (allForms.length < form_param["id"] || form_param["id"] <= 0) {
    return (
      <>
        <h1>Invaild Form id</h1>
        <Button variant="outlined" href="/">
          Home
        </Button>
      </>
    );
  }
  //return the following code
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Container maxWidth="sm">
        <IconButton
          //when clicked, router.back() is called
          onClick={() => router.back()}
          sx={{ border: "1px solid " }}
          size="small"
        >
          <ArrowBack />
        </IconButton>
        <Grid mt={1} container sx={{ padding: 3 }}>
          <Form
            //pass the formFields and setFormFields to the Form component
            formFields={formFields}
            hideCreate
            setFormFields={setFormFields}
          />
        </Grid>
      </Container>
    </Grid>
  );
}
