import { saveHistory } from "./history"

it('should save history', () => {
    const historySpy = jest.spyOn(window.history, 'pushState');

    saveHistory('car', { current: 2, pageSize: 50 })

    expect(historySpy).toHaveBeenCalledWith({}, '', 'car?page=2&pageSize=50');
}) 
