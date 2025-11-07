/**
 * Magic Item Builder Dialog
 * Implementation based on the 2024 magic items system
 */

import React, { useState, useEffect, useMemo } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Alert,
  Chip,
} from '@mui/material'
import { ArrowBack, ArrowForward, Add, Cancel, Refresh } from '@mui/icons-material'

import type { CharacterDocument, Item, Weapon, EquipmentSlotType } from '../../../../../types/Character.ts'
import {
  type QualityTier,
  type ItemCategory,
  type BaseItem,
  type SpecialMaterial,
  type Enchantment,
  qualityTierLabels,
  baseItems,
  getAvailableMaterials,
  getAvailableEnchantments,
  calculateMagicItemCost,
  getMagicItemBaseCost,
  getSpecialMaterialExtraCost,
  getEnchantmentCost,
  getWeaponDamageBonus,
  getSpellDamageBonus,
  getAmmoDamageBonus,
  getArmorAVBonus,
  getTotalAV,
  getDurabilityDie,
  generateItemName,
  generateItemDescription,
  calculatePropertyModifications,
  calculateFinalLoad,
  modifyPropertiesString,
} from '../utils/magicItemsConfig'

export type MagicItemBuilderDialogProps = {
  open: boolean
  onClose: () => void
  onCreateItem: (item: Partial<Item> | Partial<Weapon>) => void
  character: CharacterDocument
}

const steps = [
  'Select Base Item',
  'Choose Quality (Q3-Q8)',
  'Select Material (Required)',
  'Enchantment (Optional)',
  'Review & Create',
]

export const MagicItemBuilderDialog: React.FC<MagicItemBuilderDialogProps> = ({
  open,
  onClose,
  onCreateItem,
  character,
}) => {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | ''>('')
  const [selectedBaseItem, setSelectedBaseItem] = useState<BaseItem | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<QualityTier | ''>('')
  const [selectedMaterial, setSelectedMaterial] = useState<SpecialMaterial | null>(null)
  const [selectedEnchantment, setSelectedEnchantment] = useState<Enchantment | null>(null)
  const [targetLocation, setTargetLocation] = useState<'worn' | 'carried'>('carried')
  const [showConfirmClose, setShowConfirmClose] = useState(false)

  const availableQualities: QualityTier[] = [3, 4, 5, 6, 7, 8]

  // Auto-select base item for categories with only one option
  useEffect(() => {
    if (selectedCategory) {
      const categoryItems = baseItems[selectedCategory]
      if (categoryItems.length === 1) {
        setSelectedBaseItem(categoryItems[0])
      } else {
        setSelectedBaseItem(null)
      }
    }
  }, [selectedCategory])

  // Auto-select a base material (Bronze/Leather/etc.) when quality is selected
  useEffect(() => {
    if (selectedCategory && selectedQuality && !selectedMaterial) {
      const materials = getAvailableMaterials(selectedCategory, selectedQuality)
      // Find bronze or any base material
      const baseMaterial = materials.find(m => m.materialType === 'base' && m.name === 'Bronze') 
                        || materials.find(m => m.materialType === 'base')
      if (baseMaterial) {
        setSelectedMaterial(baseMaterial)
      }
    }
  }, [selectedCategory, selectedQuality])

  const availableMaterials = useMemo(() => {
    if (!selectedCategory || !selectedQuality) return []
    return getAvailableMaterials(selectedCategory, selectedQuality)
  }, [selectedCategory, selectedQuality])

  const availableEnchantments = useMemo(() => {
    if (!selectedCategory || !selectedQuality) return []
    return getAvailableEnchantments(selectedCategory, selectedQuality)
  }, [selectedCategory, selectedQuality])

  const costBreakdown = useMemo(() => {
    if (!selectedBaseItem || !selectedQuality) {
      return {
        baseCost: 0,
        magicItemBaseCost: 0,
        materialExtraCost: 0,
        enchantmentCost: 0,
        totalCost: 0,
      }
    }

    const baseCost = selectedBaseItem.cost
    const magicItemBaseCost = getMagicItemBaseCost(selectedQuality, selectedBaseItem.category)
    const materialExtraCost = getSpecialMaterialExtraCost(selectedMaterial, selectedQuality, selectedBaseItem.category)
    const enchantmentCost = selectedEnchantment ? getEnchantmentCost(selectedQuality, selectedBaseItem.category) : 0
    const totalCost = calculateMagicItemCost(selectedBaseItem, selectedQuality, selectedMaterial, selectedEnchantment)

    return {
      baseCost,
      magicItemBaseCost,
      materialExtraCost,
      enchantmentCost,
      totalCost,
    }
  }, [selectedBaseItem, selectedQuality, selectedMaterial, selectedEnchantment])

  const finalItemName = useMemo(() => {
    if (!selectedBaseItem || !selectedQuality) return ''
    return generateItemName(selectedBaseItem, selectedMaterial, selectedEnchantment, selectedQuality)
  }, [selectedBaseItem, selectedMaterial, selectedEnchantment, selectedQuality])

  const finalItemDescription = useMemo(() => {
    if (!selectedBaseItem || !selectedQuality) return ''
    let description = generateItemDescription(selectedBaseItem, selectedQuality, selectedMaterial, selectedEnchantment)
    
    // Add usage note for enchanted ammo
    if (selectedCategory === 'ammo' && selectedEnchantment) {
      description += '\n\nEach shot consumes 1 use, regardless of whether it hits.'
    }
    
    return description
  }, [selectedBaseItem, selectedQuality, selectedMaterial, selectedEnchantment, selectedCategory])

  const hasUnsavedChanges = useMemo(() => {
    return !!(selectedCategory || selectedBaseItem || selectedQuality || selectedMaterial || selectedEnchantment)
  }, [selectedCategory, selectedBaseItem, selectedQuality, selectedMaterial, selectedEnchantment])

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmClose(true)
    } else {
      handleReset()
      onClose()
    }
  }

  const handleConfirmClose = () => {
    setShowConfirmClose(false)
    handleReset()
    onClose()
  }

  const handleCancelClose = () => {
    setShowConfirmClose(false)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepClick = (stepIndex: number) => {
    const canNavigateToStep = (targetStep: number): boolean => {
      if (targetStep === 0) return true
      
      for (let i = 0; i < targetStep; i++) {
        if (!canProceedFromStep(i)) return false
      }
      return true
    }

    if (canNavigateToStep(stepIndex)) {
      setActiveStep(stepIndex)
    }
  }

  const handleReset = () => {
    setActiveStep(0)
    setSelectedCategory('')
    setSelectedBaseItem(null)
    setSelectedQuality('')
    setSelectedMaterial(null)
    setSelectedEnchantment(null)
    setTargetLocation('carried')
  }

  // Format numbers with thousand separators
  const formatCost = (cost: number): string => {
    return cost.toLocaleString('en-US')
  }

  const canProceedFromStep = (step: number): boolean => {
    switch (step) {
      case 0: return !!selectedBaseItem
      case 1: return !!selectedQuality
      case 2: return !!selectedMaterial // Materials are mandatory
      case 3: return true // Enchantments are optional
      case 4: return !!selectedMaterial
      default: return false
    }
  }

  const handleCreateItem = () => {
    if (!selectedBaseItem || !selectedQuality || !selectedMaterial || !selectedCategory) return

    const isWeapon = selectedCategory.includes('weapon') || selectedCategory === 'shield'
    
    const modifications = calculatePropertyModifications(selectedCategory as ItemCategory, selectedMaterial, selectedEnchantment)
    const finalLoad = calculateFinalLoad(selectedBaseItem.load, modifications)
    
    const baseProps = {
      name: finalItemName,
      description: finalItemDescription,
      cost: costBreakdown.totalCost,
      load: finalLoad,
      location: targetLocation,
      uses: 0,
      durability: getDurabilityDie(selectedBaseItem, selectedQuality) as any,
    }

    if (isWeapon) {
      const baseDamage = Number(selectedBaseItem.damage) || 0
      const damageBonus = getWeaponDamageBonus(Number(selectedBaseItem.quality), selectedQuality)
      
      const weapon: Partial<Weapon> = {
        ...baseProps,
        damage: {
          base: '',
          weapon: baseDamage + damageBonus,
          other: 0,
          otherWeak: 0,
          otherStrong: 0,
          otherCritical: 0,
          type: 'physical',
        },
        properties: enhanceProperties(selectedBaseItem.properties, selectedQuality, isWeapon),
        quality: selectedQuality,
      }
      onCreateItem(weapon)
    } else if (selectedCategory === 'spell-catalyst') {
      const baseDamage = Number(selectedBaseItem.damage) || 0
      const spellDamageBonus = getSpellDamageBonus(selectedQuality)
      
      const weapon: Partial<Weapon> = {
        ...baseProps,
        damage: {
          base: '',
          weapon: baseDamage + spellDamageBonus,
          other: 0,
          otherWeak: 0,
          otherStrong: 0,
          otherCritical: 0,
          type: 'physical',
        },
        properties: enhanceProperties(selectedBaseItem.properties, selectedQuality, false),
        quality: selectedQuality,
      }
      onCreateItem(weapon)
    } else {
      const enhancedProps = enhanceProperties(selectedBaseItem.properties, selectedQuality, isWeapon)
      const item: Partial<Item> & { slot?: EquipmentSlotType } = {
        ...baseProps,
        properties: enhancedProps ? enhancedProps.split(', ') : [],
        container: targetLocation === 'worn' && selectedBaseItem.slot ? 'worn' : 'backpack',
        slot: targetLocation === 'worn' ? (selectedBaseItem.slot || '') as EquipmentSlotType : '',
        amount: 1,
        quality: selectedQuality,
      }
      onCreateItem(item as Partial<Item>)
    }

    handleReset()
    onClose()
  }

  const enhanceProperties = (baseProperties: string, quality: QualityTier, isWeapon: boolean): string => {
    let properties = baseProperties

    // Handle AV for armor, shields, and helmets 
    if ((selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || 
         selectedCategory === 'shield' || selectedCategory === 'helmet') && 
        selectedBaseItem) {
      const totalAV = getTotalAV(selectedBaseItem, quality)
      
      if (properties.includes('AV +')) {
        properties = properties.replace(/AV \+\d+/g, `AV +${totalAV}`)
      } else if (selectedBaseItem.baseAV && selectedBaseItem.baseAV > 0) {
        properties = `AV +${totalAV}${properties ? ', ' + properties : ''}`
      } else if (totalAV > 0) {
        properties = `AV +${totalAV}${properties ? ', ' + properties : ''}`
      }
    }

    // Handle damage bonus and supply/pieces for ammo
    if (selectedCategory === 'ammo' && selectedBaseItem) {
      const damageBonus = getAmmoDamageBonus(Number(selectedBaseItem.quality), quality)
      let ammoProperties = []
      
      if (damageBonus > 0) {
        ammoProperties.push(`+${damageBonus} dmg`)
      }
      
      if (selectedEnchantment) {
        ammoProperties.push('3 pieces')
      } else {
        ammoProperties.push('supply')
      }
      
      const baseProps = properties ? properties.replace(/supply/g, '').replace(/,\s*$/, '').replace(/^,\s*/, '') : ''
      const allProps = baseProps ? [baseProps, ...ammoProperties] : ammoProperties
      properties = allProps.filter(p => p.trim()).join(', ')
    }

    const modifications = calculatePropertyModifications(selectedCategory as ItemCategory, selectedMaterial, selectedEnchantment)
    properties = modifyPropertiesString(properties, modifications)

    return properties
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Item Category and Base Item
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                label="Category"
                onChange={(e) => {
                  setSelectedCategory(e.target.value as ItemCategory)
                  setSelectedBaseItem(null)
                }}
              >
                <MenuItem value="one-handed-weapon">One-Handed Weapons</MenuItem>
                <MenuItem value="two-handed-weapon">Two-Handed Weapons</MenuItem>
                <MenuItem value="spell-catalyst">Spell Catalysts</MenuItem>
                <MenuItem value="light-armor">Light Armor</MenuItem>
                <MenuItem value="heavy-armor">Heavy Armor</MenuItem>
                <MenuItem value="shield">Shields</MenuItem>
                <MenuItem value="helmet">Helmets</MenuItem>
                <MenuItem value="wearable">Wearable Items</MenuItem>
                <MenuItem value="ammo">Ammunition</MenuItem>
              </Select>
            </FormControl>

            {selectedCategory && (
              <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 400 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="center">Cost</TableCell>
                      <TableCell align="center">Load</TableCell>
                      {(selectedCategory === 'one-handed-weapon' || selectedCategory === 'two-handed-weapon' || selectedCategory === 'shield') && (
                        <TableCell align="center">Damage</TableCell>
                      )}
                      {(selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'shield' || selectedCategory === 'helmet') && (
                        <TableCell align="center">Base AV</TableCell>
                      )}
                      <TableCell>Properties</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {baseItems[selectedCategory].map((item) => (
                      <TableRow
                        key={item.name}
                        hover
                        onClick={() => {
                          setSelectedBaseItem(item)
                          setSelectedMaterial(null)
                          setSelectedEnchantment(null)
                        }}
                        sx={{ 
                          cursor: 'pointer', 
                          bgcolor: selectedBaseItem?.name === item.name ? 'action.selected' : 'inherit',
                          '&:hover': { bgcolor: selectedBaseItem?.name === item.name ? 'action.selected' : 'action.hover' }
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Radio
                            checked={selectedBaseItem?.name === item.name}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">{formatCost(item.cost)}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">{item.load}</Typography>
                        </TableCell>
                        {(selectedCategory === 'one-handed-weapon' || selectedCategory === 'two-handed-weapon' || selectedCategory === 'shield') && (
                          <TableCell align="center">
                            <Typography variant="body2">{item.damage}</Typography>
                          </TableCell>
                        )}
                        {(selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'shield' || selectedCategory === 'helmet') && (
                          <TableCell align="center">
                            <Typography variant="body2">{item.baseAV || 0}</Typography>
                          </TableCell>
                        )}
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.properties}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Quality Tier (Q3-Q8)
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              <strong>Magic items start at Quality 3.</strong> Higher quality items offer better bonuses and can use more powerful materials and enchantments.
              {selectedCategory === 'wearable' && <><br/><strong>Wearables skip the Magic Item Base Cost</strong> as they only gain value from enchantments.</>}
            </Alert>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Quality</TableCell>
                    <TableCell>Magic Item Base Cost</TableCell>
                    {selectedBaseItem?.damage && <TableCell>Weapon Damage</TableCell>}
                    {selectedCategory === 'spell-catalyst' && <TableCell>Spell Damage</TableCell>}
                    {selectedCategory === 'ammo' && <TableCell>Dmg Bonus</TableCell>}
                    {(selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'helmet' || selectedCategory === 'shield') && (
                      <TableCell>AV Bonus</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {availableQualities.map((quality) => {
                    const magicBaseCost = selectedBaseItem ? getMagicItemBaseCost(quality, selectedBaseItem.category) : 0
                    return (
                      <TableRow
                        key={quality}
                        hover
                        selected={selectedQuality === quality}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setSelectedQuality(quality)}
                      >
                        <TableCell padding="checkbox">
                          <Radio checked={selectedQuality === quality} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">{qualityTierLabels[quality]}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {magicBaseCost > 0 ? `+${formatCost(magicBaseCost)} coins` : '—'}
                            {magicBaseCost === 0 && selectedCategory === 'wearable' && ' (skipped)'}
                          </Typography>
                        </TableCell>
                        {selectedBaseItem?.damage && (
                          <TableCell>
                            <Chip 
                              label={selectedBaseItem.damage + getWeaponDamageBonus(selectedBaseItem.quality, quality)}
                              size="small"
                              color="primary"
                            />
                          </TableCell>
                        )}
                        {selectedCategory === 'spell-catalyst' && (
                          <TableCell>
                            <Chip 
                              label={`+${getSpellDamageBonus(quality)}`}
                              size="small"
                              color="primary"
                            />
                          </TableCell>
                        )}
                        {selectedCategory === 'ammo' && selectedBaseItem && (
                          <TableCell>
                            <Chip 
                              label={`+${getAmmoDamageBonus(selectedBaseItem.quality, quality)}`}
                              size="small"
                              color="primary"
                            />
                          </TableCell>
                        )}
                        {(selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'helmet' || selectedCategory === 'shield') && (
                          <TableCell>
                            <Chip 
                              label={`+${getArmorAVBonus(quality)} AV`}
                              size="small"
                              color="primary"
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Material (Required)
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              <strong>All magic items require a material.</strong> Base materials (Bronze, Leather, etc.) cost nothing extra. 
              Special materials (Mithril, Dragon Scales, etc.) provide unique properties for additional cost.
            </Alert>

            {selectedMaterial && (
              <Box sx={{ mb: 2, p: 2, bgcolor: 'action.selected', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  <strong>Currently selected:</strong> {selectedMaterial.name} 
                  <Chip 
                    label={selectedMaterial.materialType === 'base' ? 'Base Material' : 'Special Material'} 
                    size="small" 
                    color={selectedMaterial.materialType === 'base' ? 'default' : 'secondary'}
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Box>
            )}

            {availableMaterials.length > 0 ? (
              <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Material</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Extra Cost</TableCell>
                      <TableCell>Description & Properties</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availableMaterials.map((material) => {
                      const extraCost = selectedQuality && selectedCategory ? getSpecialMaterialExtraCost(material, selectedQuality, selectedCategory as ItemCategory) : 0
                      return (
                        <TableRow
                          key={material.id}
                          hover
                          selected={selectedMaterial?.id === material.id}
                          sx={{ 
                            cursor: 'pointer',
                            bgcolor: selectedMaterial?.id === material.id ? 'action.selected' : 'inherit',
                          }}
                          onClick={() => setSelectedMaterial(material)}
                        >
                          <TableCell padding="checkbox">
                            <Radio checked={selectedMaterial?.id === material.id} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">{material.name}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={material.materialType === 'base' ? 'Base' : 'Special'} 
                              size="small" 
                              color={material.materialType === 'base' ? 'default' : 'secondary'}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {extraCost > 0 ? `+${formatCost(extraCost)}` : '—'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                              {material.description}
                              {material.materialType === 'special' && material.properties && (
                                <><br/><strong>Properties:</strong> {material.properties}</>
                              )}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="warning">
                No materials are available for this item category and quality tier.
              </Alert>
            )}
          </Box>
        )

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Enchantment (Optional)
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              <strong>Enchantments are optional.</strong> They provide magical abilities and bonuses. 
              You can skip this step if you only want a material upgrade.
            </Alert>

            {selectedEnchantment && (
              <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ flex: 1, p: 2, bgcolor: 'action.selected', borderRadius: 1 }}>
                  <Typography variant="subtitle2">
                    <strong>Selected:</strong> {selectedEnchantment.name}
                    <Chip 
                      label={selectedEnchantment.type} 
                      size="small" 
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  onClick={() => setSelectedEnchantment(null)}
                >
                  Clear Selection
                </Button>
              </Box>
            )}

            {availableEnchantments.length > 0 ? (
              <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Enchantment</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Qualities</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availableEnchantments.map((enchantment) => (
                      <TableRow
                        key={enchantment.id}
                        hover
                        selected={selectedEnchantment?.id === enchantment.id}
                        sx={{ 
                          cursor: 'pointer',
                          bgcolor: selectedEnchantment?.id === enchantment.id ? 'action.selected' : 'inherit',
                        }}
                        onClick={() => setSelectedEnchantment(enchantment)}
                      >
                        <TableCell padding="checkbox">
                          <Radio checked={selectedEnchantment?.id === enchantment.id} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">{enchantment.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={enchantment.type} 
                            size="small" 
                            color="primary"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                            {enchantment.qualityTiers.map(q => `Q${q}`).join(', ')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            {enchantment.description}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="info">
                No enchantments are available for this item category and quality tier.
              </Alert>
            )}
          </Box>
        )

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review & Create Magic Item
            </Typography>

            {!selectedMaterial && (
              <Alert severity="error" sx={{ mb: 2 }}>
                You must select a material to create a magic item.
              </Alert>
            )}

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {finalItemName}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {qualityTierLabels[selectedQuality as QualityTier]}
                </Typography>
                
                {/* Cost Breakdown */}
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    Cost Breakdown
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <Typography variant="body2">Base Item Cost:</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body2">{formatCost(costBreakdown.baseCost)} coins</Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography variant="body2">Magic Item Base Cost:</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body2">
                        {costBreakdown.magicItemBaseCost > 0 ? `${formatCost(costBreakdown.magicItemBaseCost)} coins` : '— (wearable)'}
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">
                          Special Material Extra Cost:
                        </Typography>
                        {selectedMaterial && (
                          <Chip 
                            label={selectedMaterial.materialType === 'base' ? 'Base' : 'Special'} 
                            size="small" 
                            sx={{ height: 16, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body2">
                        {costBreakdown.materialExtraCost > 0 ? `${formatCost(costBreakdown.materialExtraCost)} coins` : '—'}
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography variant="body2">Enchantment Cost:</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body2">
                        {costBreakdown.enchantmentCost > 0 ? `${formatCost(costBreakdown.enchantmentCost)} coins` : '—'}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>

                    <Grid item xs={8}>
                      <Typography variant="body2" fontWeight="bold">Total Cost:</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body2" fontWeight="bold">{formatCost(costBreakdown.totalCost)} coins</Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Load:</strong> {selectedBaseItem && selectedMaterial && selectedCategory && calculateFinalLoad(selectedBaseItem.load, calculatePropertyModifications(selectedCategory as ItemCategory, selectedMaterial, selectedEnchantment))}
                    </Typography>
                  </Grid>
                  {selectedBaseItem?.damage && (
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Damage:</strong> {selectedBaseItem.damage + getWeaponDamageBonus(selectedBaseItem.quality, selectedQuality as QualityTier)}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Properties:</strong> {selectedBaseItem && enhanceProperties(selectedBaseItem.properties, selectedQuality as QualityTier, selectedCategory.includes('weapon'))}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Durability:</strong> {selectedBaseItem && getDurabilityDie(selectedBaseItem, selectedQuality as QualityTier)}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ mb: 1 }} fontWeight="bold">Description</Typography>
                <TextField
                  multiline
                  rows={6}
                  fullWidth
                  value={finalItemDescription}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mb: 2 }}
                />

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="location-label">Add to Location</InputLabel>
                      <Select
                        labelId="location-label"
                        value={targetLocation}
                        label="Add to Location"
                        onChange={(e) => setTargetLocation(e.target.value as 'worn' | 'carried')}
                      >
                        <MenuItem value="worn">Equipment (Worn)</MenuItem>
                        <MenuItem value="carried">Inventory (Carried)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )

      default:
        return 'Unknown step'
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Magic Item Builder</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label, index) => {
              const canNavigateToStep = (targetStep: number): boolean => {
                if (targetStep === 0) return true
                for (let i = 0; i < targetStep; i++) {
                  if (!canProceedFromStep(i)) return false
                }
                return true
              }
              
              const isNavigable = canNavigateToStep(index)
              
              return (
                <Step key={label}>
                  <StepLabel 
                    sx={{ 
                      cursor: isNavigable ? 'pointer' : 'default',
                      '&:hover': {
                        opacity: isNavigable ? 0.8 : 1
                      },
                      '& .MuiStepLabel-label': {
                        fontWeight: isNavigable ? 'bold' : 'normal'
                      }
                    }}
                    onClick={() => isNavigable && handleStepClick(index)}
                  >
                    {label}
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>

          {renderStepContent(activeStep)}
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleClose} 
              color="error" 
              variant="outlined"
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleReset} 
              disabled={activeStep === 0}
              color="warning"
              variant="outlined"
              startIcon={<Refresh />}
            >
              Reset
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleBack} 
              disabled={activeStep === 0}
              variant="contained"
              color="inherit"
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!canProceedFromStep(activeStep)}
                endIcon={<ArrowForward />}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleCreateItem}
                disabled={!selectedMaterial}
                startIcon={<Add />}
                sx={{ minWidth: '120px' }}
              >
                Create Item
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmClose} onClose={handleCancelClose}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Are you sure you want to close without saving?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose}>
            Keep Editing
          </Button>
          <Button onClick={handleConfirmClose} color="error" variant="contained">
            Discard Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
