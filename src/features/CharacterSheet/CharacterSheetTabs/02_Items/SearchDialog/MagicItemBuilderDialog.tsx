import React, { useState, useMemo, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Step,
  Stepper,
  StepLabel,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Alert,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
} from '@mui/material'
import { 
  ExpandMore, 
  Cancel, 
  Refresh, 
  ArrowBack, 
  ArrowForward, 
  Add 
} from '@mui/icons-material'
import { CharacterDocument, Item, Weapon, EquipmentSlotType } from '../../../../../types/Character'
import {
  ItemCategory,
  QualityTier,
  BaseItem,
  SpecialMaterial,
  Enchantment,
  baseItems,
  qualityTierLabels,
  getAvailableMaterials,
  getAvailableEnchantments,
  calculateMagicItemCost,
  getWeaponDamageBonus,
  getArmorAVBonus,
  generateItemName,
  generateItemDescription,
} from '../utils/magicItemsConfig'

export type MagicItemBuilderDialogProps = {
  open: boolean
  onClose: () => void
  onCreateItem: (item: Partial<Item> | Partial<Weapon>) => void
  character: CharacterDocument
}

const steps = [
  'Select Base Item',
  'Choose Quality',
  'Special Material',
  'Enchantment',
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

  const availableMaterials = useMemo(() => {
    if (!selectedCategory || !selectedQuality) return []
    return getAvailableMaterials(selectedCategory, selectedQuality)
  }, [selectedCategory, selectedQuality])

  const availableEnchantments = useMemo(() => {
    if (!selectedCategory || !selectedQuality) return []
    return getAvailableEnchantments(selectedCategory, selectedQuality)
  }, [selectedCategory, selectedQuality])

  const finalCost = useMemo(() => {
    if (!selectedBaseItem || !selectedQuality) return 0
    return calculateMagicItemCost(
      selectedBaseItem,
      selectedQuality,
      !!selectedMaterial,
      !!selectedEnchantment
    )
  }, [selectedBaseItem, selectedQuality, selectedMaterial, selectedEnchantment])

  const finalItemName = useMemo(() => {
    if (!selectedBaseItem) return ''
    return generateItemName(selectedBaseItem, selectedMaterial || undefined, selectedEnchantment || undefined)
  }, [selectedBaseItem, selectedMaterial, selectedEnchantment])

  const finalItemDescription = useMemo(() => {
    if (!selectedBaseItem || !selectedQuality) return ''
    return generateItemDescription(
      selectedBaseItem,
      selectedQuality,
      selectedMaterial || undefined,
      selectedEnchantment || undefined
    )
  }, [selectedBaseItem, selectedQuality, selectedMaterial, selectedEnchantment])

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
    // Allow navigation to any step that is either completed or the immediate next step
    const canNavigateToStep = (targetStep: number): boolean => {
      // Can always go to step 0
      if (targetStep === 0) return true
      
      // Check if all previous steps are completed
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

  const canProceedFromStep = (step: number): boolean => {
    switch (step) {
      case 0: return !!selectedBaseItem
      case 1: return !!selectedQuality
      case 2: return true // Materials are optional
      case 3: return true // Enchantments are optional
      case 4: return !!(selectedMaterial || selectedEnchantment) // Must have at least one
      default: return false
    }
  }

  const handleCreateItem = () => {
    if (!selectedBaseItem || !selectedQuality) return

    const isWeapon = selectedCategory.includes('weapon') || selectedCategory === 'shield'
    const baseProps = {
      name: finalItemName,
      description: finalItemDescription,
      cost: finalCost,
      load: selectedBaseItem.load,
      location: targetLocation,
      uses: 0,
      durability: 'd8' as const,
    }

    if (isWeapon) {
      const baseDamage = selectedBaseItem.damage || 0
      const damageBonus = getWeaponDamageBonus(selectedBaseItem.quality, selectedQuality)
      
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
      }
      onCreateItem(weapon)
    } else {
      const item: Partial<Item> = {
        ...baseProps,
        properties: enhanceProperties(selectedBaseItem.properties, selectedQuality, isWeapon),
        container: selectedBaseItem.slot ? 'worn' : 'backpack',
        amount: 1,
        slot: (selectedBaseItem.slot || '') as EquipmentSlotType,
      }
      onCreateItem(item)
    }

    handleReset()
    onClose()
  }

  const enhanceProperties = (baseProperties: string, quality: QualityTier, isWeapon: boolean): string => {
    let properties = baseProperties

    // Add quality-based bonuses
    if (isWeapon && selectedBaseItem?.damage) {
      const damageBonus = getWeaponDamageBonus(selectedBaseItem.quality, quality)
      if (damageBonus > 0) {
        properties += `, +${damageBonus} weapon damage`
      }
    }

    // Add spell damage bonus for spell catalysts
    if (selectedCategory === 'spell-catalyst') {
      let spellDamageBonus = 0
      if (quality >= 4) {
        spellDamageBonus = quality - 3 // Q4=+1, Q5=+2, Q6=+3, etc.
      }
      // Q3 items get +0 spell damage if they're already Q3 base
      if (spellDamageBonus > 0) {
        properties += `, +${spellDamageBonus} spell damage`
      }
    }

    if (!isWeapon && (selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'helmet' || selectedCategory === 'shield')) {
      const avBonus = getArmorAVBonus(quality)
      if (avBonus > 0) {
        properties += `, +${avBonus} AV (enhancement)`
      }
    }

    // Add durability bonus
    const durabilityBonuses: Record<QualityTier, string> = {
      3: '',
      4: ', +1d durability',
      5: ', +1d durability',
      6: ', +2d durability',
      7: ', +2d durability',
      8: ', +3d durability',
    }
    if (durabilityBonuses[quality]) {
      properties += durabilityBonuses[quality]
    }

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
              <>
                {baseItems[selectedCategory].length === 1 ? (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Only one {selectedCategory.replace('-', ' ')} type available: <strong>{baseItems[selectedCategory][0].name}</strong> (automatically selected)
                  </Alert>
                ) : (
                  <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="center">Quality</TableCell>
                          <TableCell align="center">Cost</TableCell>
                          <TableCell align="center">Load</TableCell>
                          {(selectedCategory === 'one-handed-weapon' || selectedCategory === 'two-handed-weapon' || selectedCategory === 'shield') && (
                            <TableCell align="center">Damage</TableCell>
                          )}
                          <TableCell>Properties</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {baseItems[selectedCategory].map((item) => (
                          <TableRow
                            key={item.name}
                            hover
                            onClick={() => setSelectedBaseItem(item)}
                            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                          >
                            <TableCell padding="checkbox">
                              <Radio
                                checked={selectedBaseItem?.name === item.name}
                                onChange={() => setSelectedBaseItem(item)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                  {item.name}
                                </Typography>
                                {item.description && (
                                  <Typography variant="caption" color="text.secondary">
                                    {item.description}
                                  </Typography>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">{item.quality}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">{item.cost}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">{item.load}</Typography>
                            </TableCell>
                            {(selectedCategory === 'one-handed-weapon' || selectedCategory === 'two-handed-weapon' || selectedCategory === 'shield') && (
                              <TableCell align="center">
                                <Typography variant="body2">{item.damage || '-'}</Typography>
                              </TableCell>
                            )}
                            <TableCell>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  lineHeight: 1.2,
                                }}
                              >
                                {item.properties}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            )}
          </Box>
        )

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Quality Tier
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Higher quality items are more expensive but offer better bonuses and can access more powerful materials and enchantments.
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Quality</TableCell>
                    <TableCell>Cost</TableCell>
                    {selectedBaseItem?.damage && <TableCell>Weapon Damage</TableCell>}
                    {selectedCategory === 'spell-catalyst' && <TableCell>Spell Damage</TableCell>}
                    {(selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'helmet') && (
                      <TableCell>AV Bonus</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {availableQualities.map((quality) => (
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
                        <Typography variant="subtitle2">{qualityTierLabels[quality]}</Typography>
                      </TableCell>
                      <TableCell>
                        {selectedBaseItem && calculateMagicItemCost(selectedBaseItem, quality, false, false)} coins
                      </TableCell>
                      {selectedBaseItem?.damage && (
                        <TableCell>
                          {selectedBaseItem.damage + getWeaponDamageBonus(selectedBaseItem.quality, quality)}
                        </TableCell>
                      )}
                      {selectedCategory === 'spell-catalyst' && (
                        <TableCell>
                          +{quality >= 4 ? quality - 3 : 0} spell damage
                        </TableCell>
                      )}
                      {(selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'helmet') && (
                        <TableCell>
                          +{getArmorAVBonus(quality)}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Special Material (Optional)
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Special materials provide unique properties and abilities. You can skip this step if you only want an enchantment.
            </Typography>
            
            {selectedMaterial && (
              <Button
                variant="outlined"
                onClick={() => setSelectedMaterial(null)}
                sx={{ mb: 2 }}
              >
                Clear Selection
              </Button>
            )}

            {availableMaterials.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Material</TableCell>
                      <TableCell>Available Qualities</TableCell>
                      <TableCell>Properties</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availableMaterials.map((material) => (
                      <TableRow
                        key={material.id}
                        hover
                        selected={selectedMaterial?.id === material.id}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setSelectedMaterial(material)}
                      >
                        <TableCell padding="checkbox">
                          <Radio checked={selectedMaterial?.id === material.id} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{material.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {material.qualityTiers.map((tier) => (
                              <Chip
                                key={tier}
                                label={`Q${tier}`}
                                size="small"
                                color={tier === selectedQuality ? 'primary' : 'default'}
                              />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
                            {material.properties}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {material.description}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="info">
                No special materials are available for this item category and quality tier.
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
            <Typography variant="body1" color="text.secondary" paragraph>
              Enchantments provide magical abilities and bonuses. You can skip this step if you only want a special material.
            </Typography>

            {selectedEnchantment && (
              <Button
                variant="outlined"
                onClick={() => setSelectedEnchantment(null)}
                sx={{ mb: 2 }}
              >
                Clear Selection
              </Button>
            )}

            {availableEnchantments.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Enchantment</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Available Qualities</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availableEnchantments.map((enchantment) => (
                      <TableRow
                        key={enchantment.id}
                        hover
                        selected={selectedEnchantment?.id === enchantment.id}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setSelectedEnchantment(enchantment)}
                      >
                        <TableCell padding="checkbox">
                          <Radio checked={selectedEnchantment?.id === enchantment.id} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{enchantment.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={enchantment.type}
                            size="small"
                            color={enchantment.type === 'prefix' ? 'secondary' : 'primary'}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {enchantment.qualityTiers.map((tier) => (
                              <Chip
                                key={tier}
                                label={`Q${tier}`}
                                size="small"
                                color={tier === selectedQuality ? 'primary' : 'default'}
                              />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
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

            {!selectedMaterial && !selectedEnchantment && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                You must select at least one special material or enchantment to create a magic item.
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
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Cost: <strong>{finalCost} coins</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Load: <strong>{selectedBaseItem?.load}</strong>
                    </Typography>
                  </Grid>
                  {selectedBaseItem?.damage && (
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Damage: <strong>
                          {selectedBaseItem.damage + getWeaponDamageBonus(selectedBaseItem.quality, selectedQuality as QualityTier)}
                        </strong>
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Properties: <strong>{enhanceProperties(selectedBaseItem?.properties || '', selectedQuality as QualityTier, selectedCategory.includes('weapon') || selectedCategory === 'shield')}</strong>
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ mb: 1 }}>Description</Typography>
                <TextField
                  multiline
                  rows={5}
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
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              disabled={!selectedMaterial && !selectedEnchantment}
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
