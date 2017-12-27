import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { blue} from '../utils/colors';

export default function TextButton ({children, onPress, style}) {
    return (
          <TouchableOpacity onPress={onPress}>
              <Text style={style}>
                  {children}
              </Text>
          </TouchableOpacity>
    )
}