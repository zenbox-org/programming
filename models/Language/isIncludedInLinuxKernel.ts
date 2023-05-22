import { getStaticMultiFilter } from '../../../generic/models/Filter'
import { CLang, Rust } from '../../data/allLanguages'

export const isIncludedInLinuxKernel = getStaticMultiFilter([CLang, Rust])
