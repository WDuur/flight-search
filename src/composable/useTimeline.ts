import { ref } from 'vue'
import type { TimelineItem } from '@/interface/types'

const timeline = ref<TimelineItem[]>([
  {
    status: 'Vlucht zoeken',
    isSelected: true,
    id: 'search',
  },
  {
    status: 'Selecteer vlucht',
    isSelected: false,
    id: 'select',
  },
  {
    status: 'Passagiers',
    isSelected: false,
    id: 'passengers',
  },
  {
    status: 'Overzicht',
    isSelected: false,
    id: 'Overview',
  },
  {
    status: 'Bevestiging',
    isSelected: false,
    id: 'confirmation',
  },
])

export function useTimeline() { 

  const selectSearchTimelinex = () => {
    console.log('selectSearchTimeline')
  }

  const selectTimeline = (id: string) => {
    const item = timeline.value.find((item) => item.id === id);
    if (item) {
      item.isSelected = !item.isSelected;
    }
  }
  

	return {
		timeline,
    selectTimeline,
	}
}
