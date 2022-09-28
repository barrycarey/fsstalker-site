import {styled} from "@mui/material";

export const RoundedRow = styled('div')({
    borderRadius: 6,
    maxWidth: '100%',
    height: '55px',
    background: '#3d3d3d',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    padding: 6,
    alignItems: 'center',
    marginBottom: 10,
    verticalAlign: 'middle',
})
export const RoundedRowSections = styled('div')({
    height: '100%',
    justifyContent: 'left',
    borderStyle: 'solid',
    borderWidth: 0,
    overflow: 'hidden',
    alignItems: 'center',
    display: 'inline-flex',
})

