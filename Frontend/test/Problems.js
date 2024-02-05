import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as db from '../database/problems.js';
export default function Problems() {
  // db.create({
  //   title: "need cleanup",
  //   context: "ffss",
  //   latitude: -30,
  //   longtitude: 30
  // })
 // db.getAll();

 // db.remove("1OuRUbpR3s19grdLcnuC");
  db.get("eGrdp8OIAi2sOCEET0Fs");
  db.flag("eGrdp8OIAi2sOCEET0Fs", -2);
    return (
      <></>
    );
}