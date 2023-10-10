// This code is a React component that renders a page with a list of forms. It
// imports various components and icons from the Material-UI library and Next.js.
"use client";
import { ArrowBack, Delete } from "@mui/icons-material";
import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  // Declare a state variable to store the list of all forms
  let [allForms, setAllForms] = useState([]);
  // Get the router object to navigate between pages
  const router = useRouter();

  // Load the list of all forms from local storage on page load
  useEffect(() => {
    setAllForms(JSON.parse(localStorage.getItem("all_forms")) || []);
  }, []);

  // Handle the delete button click event
  const handleDeleteForm = (e, target_index) => {
    console.log("target_index", target_index);
    // Remove the form from the list
    let forms_after_delete = [...allForms].splice(target_index, 0);
    console.log(forms_after_delete);
    // Update the list of all forms in the state
    setAllForms(forms_after_delete);
    // Update the list of all forms in local storage
    localStorage.setItem("all_forms", JSON.stringify(forms_after_delete));
  };

  // Render the page with the list of forms
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Container maxWidth="sm">
        <IconButton
          onClick={() => router.back()}
          sx={{ border: "1px solid " }}
          size="small"
        >
          <ArrowBack />
        </IconButton>
        <Grid
          mt={1}
          container
          sx={{ background: "white", borderRadius: "12px", padding: 2 }}
        >
          <Grid item container justifyContent={"center"}>
            <Typography>All Forms : {allForms?.length}</Typography>
          </Grid>
          <Grid item container gap={2} mt={2}>
            {allForms && allForms.length > 0 ? (
              allForms.map((form, index) => (
                <Grid key={index} container justifyContent={"space-between"}>
                  <Typography>Form {index + 1}.</Typography>
                  <Link href={"/view-form/" + (index + 1)}> View Form</Link>
                  <IconButton
                    color="error"
                    onClick={(e) => handleDeleteForm(e, index)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              ))
            ) : (
              <Typography>You have not created any Forms. </Typography>
            )}
          </Grid>
        </Grid>
        <div style={{ position: "fixed", bottom: 0, left: "45%" }}>
          <a href="https://www.linkedin.com/in/ankit-kumar-76569a172/">
            Developed by Ankit Kumar
          </a>
        </div>
      </Container>
    </Grid>
  );
}
