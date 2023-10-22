import { getStaticMultiFilter } from '../../../utils/Filter'
import { CLang, Rust } from '../../data/allLanguages'

export const isIncludedInLinuxKernel = getStaticMultiFilter([CLang, Rust])
