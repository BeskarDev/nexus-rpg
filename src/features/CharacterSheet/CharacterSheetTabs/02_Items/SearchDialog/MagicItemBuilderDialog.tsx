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
  getMaterialExtraCost,
  getEnchantmentCost,
  getWeaponDamageBonus,
  getAmmoDamageBonus,
  getArmorAVBonus,
  getTotalAV,
  getDurabilityDie,
  getSpellDamageBonus,
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
  'Choose Quality',
  'Select Material',
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

  // Auto-select default base material (bronze) when quality is selected
  useEffect(() => {
    if (selectedCategory && selectedQuality && !selectedMaterial) {
      const materials = getAvailableMaterials(selectedCategory, selectedQuality)
      // Find a base material (bronze preferred, or any base material)
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

  const finalCost = useMemo(() => {
    if (!selectedBaseItem || !selectedQuality) return 0
    return calculateMagicItemCost(
      selectedBaseItem,
      selectedQuality,
      selectedMaterial,
      !!selectedEnchantment
    )
  }, [selectedBaseItem, selectedQuality, selectedMaterial, selectedEnchantment])

  const materialExtraCost = useMemo(() => {
    if (!selectedBaseItem || !selectedQuality || !selectedMaterial) return 0
    return getMaterialExtraCost(selectedMaterial, selectedQuality, selectedBaseItem.category)
  }, [selectedBaseItem, selectedQuality, selectedMaterial])

  const enchantmentCost = useMemo(() => {
    if (!selectedBaseItem || !selectedQuality || !selectedEnchantment) return 0
    return getEnchantmentCost(selectedQuality, selectedBaseItem.category)
  }, [selectedBaseItem, selectedQuality, selectedEnchantment])

  const finalItemName = useMemo(() => {
    if (!selectedBaseItem) return ''
    const baseName = generateItemName(
      selectedBaseItem, 
      selectedMaterial || undefined, 
      selectedEnchantment || undefined,
      selectedQuality || undefined
    )
    // For baseline magic ammo (no materials or enchantments), add "Magic" prefix
    if (selectedCategory === 'ammo' && !selectedMaterial && !selectedEnchantment) {
      return `Magic ${baseName}`
    }
    return baseName
  }, [selectedBaseItem, selectedMaterial, selectedEnchantment, selectedCategory, selectedQuality])

  const finalItemDescription = useMemo(() => {
    if (!selectedBaseItem || !selectedQuality) return ''
    let description = generateItemDescription(
      selectedBaseItem,
      selectedQuality,
      selectedMaterial || undefined,
      selectedEnchantment || undefined
    )
    
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
      case 2: return !!selectedMaterial // Materials are now mandatory
      case 3: return true // Enchantments are optional
      case 4: return !!selectedMaterial // Must have a material selected
      default: return false
    }
  }

  const handleCreateItem = () => {
    if (!selectedBaseItem || !selectedQuality) return

    const isWeapon = selectedCategory.includes('weapon') || selectedCategory === 'shield'
    
    // Calculate property modifications from material and enchantment
    const modifications = calculatePropertyModifications(selectedCategory, selectedMaterial, selectedEnchantment)
    const finalLoad = calculateFinalLoad(selectedBaseItem.load, modifications)
    
    const baseProps = {
      name: finalItemName,
      description: finalItemDescription,
      cost: finalCost,
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
      // Spell catalysts get spell damage bonuses but are stored as weapons
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
      const item: Partial<Item> = {
        ...baseProps,
        properties: enhanceProperties(selectedBaseItem.properties, selectedQuality, isWeapon),
        container: targetLocation === 'worn' && selectedBaseItem.slot ? 'worn' : 'backpack',
        amount: 1,
        slot: targetLocation === 'worn' ? (selectedBaseItem.slot || '') as EquipmentSlotType : '',
        quality: selectedQuality,
      }
      onCreateItem(item)
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
      
      // Always check for existing AV in properties string first
      if (properties.includes('AV +')) {
        // Replace existing AV with total AV (use a more robust replacement)
        properties = properties.replace(/AV \+\d+/g, `AV +${totalAV}`)
      } else if (selectedBaseItem.baseAV && selectedBaseItem.baseAV > 0) {
        // For items with separate baseAV field but no AV in properties string
        properties = `AV +${totalAV}${properties ? ', ' + properties : ''}`
      } else if (totalAV > 0) {
        // Add AV for items that don't have base AV (like bucklers)
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
      
      // Add supply or pieces description based on enchantment
      if (selectedEnchantment) {
        ammoProperties.push('3 pieces')
      } else {
        ammoProperties.push('supply')
      }
      
      // Combine with existing properties
      const baseProps = properties ? properties.replace(/supply/g, '').replace(/,\s*$/, '').replace(/^,\s*/, '') : ''
      const allProps = baseProps ? [baseProps, ...ammoProperties] : ammoProperties
      properties = allProps.filter(p => p.trim()).join(', ')
    }

    // Apply material and enchantment property modifications
    const modifications = calculatePropertyModifications(selectedCategory, selectedMaterial, selectedEnchantment)
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
                          setSelectedBaseItem(item);
                          setSelectedMaterial(null);
                          setSelectedEnchantment(null);
                        }}
                        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                      >
                        <TableCell padding="checkbox">
                          <Radio
                            checked={selectedBaseItem?.name === item.name}
                            onChange={() => {
                              setSelectedBaseItem(item);
                              setSelectedMaterial(null);
                              setSelectedEnchantment(null);
                            }}
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
                        {(selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'shield' || selectedCategory === 'helmet') && (
                          <TableCell align="center">
                            <Typography variant="body2">{item.baseAV || '-'}</Typography>
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
          </Box>
        )

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Quality Tier
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {selectedCategory === 'ammo' 
                ? 'Magic ammo deals extra damage and comes as supply units. Enchanted ammo comes as individual pieces (up to 3 per slot).'
                : 'Higher quality items are more expensive but offer better bonuses and can access more powerful materials and enchantments.'
              }
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
                    {selectedCategory === 'ammo' && <TableCell>Dmg Bonus</TableCell>}
                    {(selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'helmet' || selectedCategory === 'shield') && (
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
                          +{getSpellDamageBonus(quality)} spell damage
                        </TableCell>
                      )}
                      {selectedCategory === 'ammo' && selectedBaseItem && (
                        <TableCell>
                          +{getAmmoDamageBonus(selectedBaseItem.quality, quality)}
                        </TableCell>
                      )}
                      {(selectedCategory === 'light-armor' || selectedCategory === 'heavy-armor' || selectedCategory === 'helmet' || selectedCategory === 'shield') && (
                        <TableCell>
                          +{getArmorAVBonus(quality)} AV
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
              Select Material (Required)
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              All items must be made from a material. Base materials (like Bronze) provide flavor at no extra cost. 
              Special materials provide unique properties for additional cost (approximately 50% of enchantment cost).
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Currently selected:</strong> {selectedMaterial ? `${selectedMaterial.name} (${selectedMaterial.materialType === 'base' ? 'Base - No Extra Cost' : 'Special'})` : 'None'}
            </Typography>

            {availableMaterials.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Material</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Extra Cost</TableCell>
                      <TableCell>Properties</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availableMaterials.map((material) => {
                      const extraCost = selectedQuality ? getMaterialExtraCost(material, selectedQuality, selectedCategory) : 0
                      return (
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
                            <Chip
                              label={material.materialType === 'base' ? 'Base' : 'Special'}
                              size="small"
                              color={material.materialType === 'base' ? 'default' : 'secondary'}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ fontWeight: extraCost > 0 ? 'bold' : 'normal' }}>
                              {extraCost > 0 ? `+${extraCost} coins` : '0 coins'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color={material.properties ? "primary" : "text.secondary"} sx={{ fontWeight: material.properties ? 'medium' : 'normal' }}>
                            {material.properties || 'No mechanical effect'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {material.description}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="warning">
                No materials are available for this item category and quality tier. This should not happen.
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
                  <Typography variant="subtitle2" gutterBottom>
                    Cost Breakdown
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <Typography variant="body2">Base Item Cost:</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body2">{selectedBaseItem?.cost || 0} coins</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">Material Extra Cost:</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body2" sx={{ fontWeight: materialExtraCost > 0 ? 'bold' : 'normal' }}>
                        {materialExtraCost > 0 ? '+' : ''}{materialExtraCost} coins
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">Enchantment Cost:</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body2" sx={{ fontWeight: enchantmentCost > 0 ? 'bold' : 'normal' }}>
                        {enchantmentCost > 0 ? '+' : ''}{enchantmentCost} coins
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 0.5 }} />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="subtitle2">Total Cost:</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="subtitle2" color="primary">{finalCost} coins</Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Load: <strong>{selectedBaseItem ? calculateFinalLoad(selectedBaseItem.load, calculatePropertyModifications(selectedCategory, selectedMaterial, selectedEnchantment)) : 0}</strong>
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
                  <Grid item xs={12}>
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
