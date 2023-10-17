import React from 'react';
import * as Progress from 'react-native-progress';
import {THEME_COLORS} from '../contants/theme';

type Props = {
  loading: boolean;
};

const Loading = ({loading}: Props) => {
  const colors = [THEME_COLORS.primary, THEME_COLORS.secondary];

  if (!loading) return <></>;
  return <Progress.CircleSnail color={colors} size={100} />;
};

export default Loading;
