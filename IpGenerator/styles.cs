.form-inline { 
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

/* hide up/down arrows ("spinners") on input fields marked type="number" */
.no-spinners {
  -moz-appearance:textfield;
}

.no-spinners::-webkit-outer-spin-button,
.no-spinners::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}