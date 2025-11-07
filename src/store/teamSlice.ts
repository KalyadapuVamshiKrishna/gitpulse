import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'developer' | 'designer' | 'manager';
  avatar: string;
  commits: number;
  repos: number;
  stars: number;
  joinedDate: string;
  status: 'active' | 'away' | 'offline';
}

interface TeamState {
  members: TeamMember[];
  loading: boolean;
}

const initialState: TeamState = {
  members: [],
  loading: false,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeamMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload;
    },
    addTeamMember: (state, action: PayloadAction<TeamMember>) => {
      state.members.push(action.payload);
    },
    removeTeamMember: (state, action: PayloadAction<number>) => {
      state.members = state.members.filter(member => member.id !== action.payload);
    },
    updateTeamMember: (state, action: PayloadAction<TeamMember>) => {
      const index = state.members.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTeamMembers, addTeamMember, removeTeamMember, updateTeamMember, setLoading } = teamSlice.actions;
export default teamSlice.reducer;
