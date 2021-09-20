import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  bodyRating,
  moistureRating,
  getImgUrl,
} from "../panel-details/ip-rating";

// interface IState {
//     ipRating: {
//       [key: string]: boolean;
//     };
//   }

export default function IpRating() {
  const [ipRating, setIpRating] = useState(["0", "0"]);

  const handleIpRatingChange = (e: SelectChangeEvent, type: string) => {
    if (type === "particles") {
      const ipRatingCopy = [...ipRating];
      ipRatingCopy[0] = e.target.value as string;
      setIpRating(ipRatingCopy);
    } else if (type === "moisture") {
      const ipRatingCopy = [...ipRating];
      ipRatingCopy[1] = e.target.value as string;
      setIpRating(ipRatingCopy);
    }
  };

  return (
    <div className='panel__ip-rating-inner'>
      <div className='panel__ip-rating-box'>
        <img
          src={getImgUrl(ipRating[1], moistureRating)}
          alt='moisture rating'
        />
        <img src={getImgUrl(ipRating[0], bodyRating)} alt='body rating' />
        <div className='panel__ip-rating-text'>
          {ipRating[0]}
          {ipRating[1]}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1em",
        }}
      >
        <FormControl variant='standard'>
          <Select
            labelId='ip-rating-label'
            id='ip-rating'
            value={ipRating[0]}
            label='IP Rating'
            onChange={(event: SelectChangeEvent) =>
              handleIpRatingChange(event, "particles")
            }
            size='small'
          >
            {bodyRating.map((val: { value: number; img: any }) => (
              <MenuItem value={val.value}>{val.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard'>
          <Select
            labelId='ip-rating-label'
            id='ip-rating'
            value={ipRating[1]}
            label='IP Rating'
            onChange={(event: SelectChangeEvent) =>
              handleIpRatingChange(event, "moisture")
            }
            size='small'
          >
            {moistureRating.map((val: { value: number; img: any }) => (
              <MenuItem value={val.value}>{val.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
