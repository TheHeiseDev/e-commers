import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function HalfRating({ rating }) {
  const [ratingValue, setRatingValue] = React.useState(rating);

  //  React.useEffect(()=> {

  //  },[rating])
  return (
    <Stack spacing={1}>
      {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
      <Rating
        name="half-rating-read"
        defaultValue={ratingValue}
        precision={0.5}
        readOnly
      />
    </Stack>
  );
}
