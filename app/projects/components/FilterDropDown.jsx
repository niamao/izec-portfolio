import { useState } from 'react';
import {
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox, 
  ScrollArea,
  Text,
  Popover,
  CloseButton,
  Divider,
  CheckIcon,
  Switch,
  Checkbox
} from '@mantine/core';
import { SVGComponent } from "components";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import { useDisclosure } from '@mantine/hooks';
import { useStoreContext } from 'store/provider'

const MAX_DISPLAYED_VALUES = 2;

export function FilterDropDown({ 
  data,
  hidePickedOptions,
  comboboxProps,
  nothingFoundMessage,
  placeholder
}) {
  const [checked, setChecked] = useState(false); 
  const [search, setSearch] = useState('');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  })
  const { value, setValue, hideSelected, setHideSelected } = useStoreContext([]);
  const [opened, { close, open }] = useDisclosure(false);

  const allItems = data.reduce((acc, group) => [...acc, ...group.items], []);

  const shouldFilterOptions = allItems.every((item) => item !== search);

  const filteredGroups = data.map((group) => {
    let filteredOptions = shouldFilterOptions
      ? group.items.filter((item) => item.value.toLowerCase().includes(search.toLowerCase().trim()))
      : group.items;

    if (hidePickedOptions || hideSelected) {
      filteredOptions = filteredOptions.filter(item => !value.includes(item.value))
    }

    return { ...group, items: filteredOptions };
  });

  const totalOptions = filteredGroups.reduce((acc, group) => acc + group.items.length, 0);

  const handleValueSelect = (val) => {
    let newVal = []

    if (value.includes(val)) {
      newVal = value.filter((v) => v !== val)
    } else {
      newVal = [...value, val]
    }

    if (allItems.length === newVal.length) {
      setChecked(true)
    } else {
      setChecked(false)
    }

    setValue(newVal)
  }

  const handleValueRemove = (val) => {
    const newVal = value.filter((v) => v !== val)

    setChecked(false)
    setValue(newVal)
  }

  const values = value
    .slice(
      0,
      MAX_DISPLAYED_VALUES === value.length ? MAX_DISPLAYED_VALUES : MAX_DISPLAYED_VALUES - 1
    )
    .map((item) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        <div className='flex flex-row gap-1'>
          <div className='pt-1'>
            <SVGComponent svgString={allItems.find(i => i.value === item).icon} width={15} />
          </div>
          {item}
        </div>
      </Pill>
    ));

  const hiddenValues = value
    .slice(1)
    .map((item) => (
      <Pill
        key={item}
        onRemove={() => {
          handleValueRemove(item)
          if (value.length === 3) close()
        }}
        withRemoveButton
      >
        <div className='flex flex-row gap-1'>
          <div className='pt-1'>
            <SVGComponent svgString={allItems.find(i => i.value === item).icon} width={15} />
          </div>
          {item}
        </div>
      </Pill>
    ));

  const groups = filteredGroups.map(({ group, items }) => {
    const sortedItems = items.slice().sort((a, b) => {
      return a.value.localeCompare(b.value);
    });

    let filteredItems = sortedItems

    const options = filteredItems.map((item) => (
      <Combobox.Option value={item.value} key={item.value} active={value.includes(item.value)}>
        <Group gap="sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <SVGComponent svgString={item.icon} width={15} />
              <div className="ml-2">
                <Text size="sm">{item.value}</Text>
              </div>
            </div>
            {value.includes(item.value) && <CheckIcon size={12} />}
          </div>
        </Group>
      </Combobox.Option>
    ));

    return (
      <Combobox.Group label={group} key={group}>
        {options}
      </Combobox.Group>
    );
  });

  const emptyOption = search.length ? (
    <Combobox.Empty>{nothingFoundMessage || 'Nothing found'}</Combobox.Empty>
  ) : (
    <Combobox.Empty>All options selected</Combobox.Empty>
  )

  return (
    <Combobox
        store={combobox}
        onOptionSubmit={handleValueSelect}
        withinPortal={false}
        { ...comboboxProps }
    >
      <Combobox.DropdownTarget>
        <PillsInput
          rightSection={
            search.length ? (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setSearch('')}
                aria-label="Clear value"
              />
            ) : (
              <FaCaretDown />
            )
          }
        >
          <Pill.Group>
            {values}
            {value.length > MAX_DISPLAYED_VALUES && (
              <Group justify="center">
                <Popover width={280} shadow="md" offset={10} opened={opened}>
                  <Popover.Target>
                    <Pill
                      className="cursor-pointer"
                      onClick={opened ? close : open}
                    >
                      {opened ? 'View Less' :  `+${value.length - (MAX_DISPLAYED_VALUES - 1)} more`}
                    </Pill>
                  </Popover.Target>
                  <Popover.Dropdown>
                    {hiddenValues}
                    <Divider my="sm" />
                    {hiddenValues.length >= 2 && (
                      <div
                        className='cursor-pointer float-right -my-2.5 pr-0.5'
                        onClick={() => {
                          setValue([])
                          setChecked(false)
                          close()
                        }} 
                      >
                        <Text size="sm">
                          Clear All
                        </Text>
                      </div>
                    )}
                  </Popover.Dropdown>
                </Popover>
              </Group>
            )}
            <CiSearch />
            <Combobox.EventsTarget>
              <PillsInput.Field
                value={search}
                placeholder={placeholder || "Search"}
                onChange={(event) => {
                  combobox.openDropdown()
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    combobox.openDropdown()
                  }
                }}
                onClick={() => combobox.openDropdown()}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Header>
          <div className='flex justify-between'>
            <Switch
              size="xs"
              checked={hideSelected}
              onChange={(event) => setHideSelected(!hideSelected)}
              label='Hide selected options'
            />
            {!hideSelected && (
              <Checkbox 
                checked={checked}
                onChange={(event) => {
                  if (checked) {
                    setValue([])
                  } else {
                    setValue(filteredGroups.flatMap(({ items }) => items.map(item => item.value)).sort())
                  }

                  setChecked(event.currentTarget.checked)
                }}
              />
            )}
          </div>
        </Combobox.Header>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {totalOptions > 0 ? groups : emptyOption }
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
