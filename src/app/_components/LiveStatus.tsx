import { useMemo } from "react";
import styled from "styled-components";

const CircularProgress = styled.div<{ progress: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: conic-gradient(#44DB5E 0% 50%, #565D57 0% 100%);
  background: ${((props) => `conic-gradient(#44DB5E 0% ${props.progress}, #565D57 0% 100%)`)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: rotate(0deg);
`;

const InnerCircle = styled.div<{ $displayLiveStatus: string }>`
  width: 95%;
  height: 95%;
  background: #3D3D3D;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(
    (props) => props.$displayLiveStatus === 'FT' || props.$displayLiveStatus === 'HT' ? '#44DB5E' : '#FFFFFF'
  )};
`;

interface LiveStatusProps {
  liveStatus: string;
}

const LiveSatus: React.FC<LiveStatusProps> = ({ liveStatus }) => {
  const displayLiveStatus = useMemo(() => {
    if (liveStatus === 'Canceled' || liveStatus === '-') return ''
    return liveStatus;
  }, [liveStatus])

  const progress = useMemo(() => {
    switch (liveStatus) {
      case 'HT':
        return '50%';
      case 'FT':
        return '100%';
      case 'Canceled':
      case '-':
        return '0%';
      default:
        return '30%';
    }
  }, [liveStatus]);

  return (
    <CircularProgress progress={progress}>
      <InnerCircle $displayLiveStatus={displayLiveStatus}>
        {displayLiveStatus}
      </InnerCircle>
    </CircularProgress>
  )
};

export default LiveSatus;