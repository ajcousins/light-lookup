import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  bodyRating,
  moistureRating,
  getImgUrl,
} from "../panel-details/ip-rating";
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIpParticle,
  updateIpMoisture,
} from "../features/query/querySlice";

export default function IpRating() {
  const dispatch = useDispatch();
  const ipParticle = useSelector((state: RootState) => state.query.ipParticle);
  const ipMoisture = useSelector((state: RootState) => state.query.ipMoisture);
  // const [exactMatch, setExactMatch] = useState(false);

  const handleIpRatingChange = (e: SelectChangeEvent, type: string) => {
    if (type === "particle") {
      dispatch(updateIpParticle(Number(e.target.value)));
    } else if (type === "moisture") {
      dispatch(updateIpMoisture(Number(e.target.value)));
    }
  };

  return (
    <div className='panel__ip-rating-inner'>
      <div className='panel__ip-rating-box'>
        <img
          src={getImgUrl(String(ipMoisture), moistureRating)}
          alt='moisture rating'
        />
        <img
          src={getImgUrl(String(ipParticle), bodyRating)}
          alt='body rating'
        />
        <div className='panel__ip-rating-text'>
          {ipParticle}
          {ipMoisture}
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
            value={String(ipParticle)}
            label='IP Rating'
            onChange={(event: SelectChangeEvent) =>
              handleIpRatingChange(event, "particle")
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
            value={String(ipMoisture)}
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
